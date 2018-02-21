# Importing the dependencies
# This is needed to create a lxml object that uses the css selector
from bs4 import BeautifulSoup


# The requests library
import requests
import json
import re
import os
import sys
import numpy as np
from datetime import datetime


class AqmthaiScraper:

    scaped_pm25 = []
    mean_list = []
    items_list = []
    page_total = 2

    def create_raw_data(self, stationId, startDate, startTime, endDate,  endTime, page):
        return "action=showTable&paramValue=PM2.5%%" \
            + "&endDate=" + endDate \
            + "&startDate=" + startDate \
            + "&stationId=" + stationId + ",%%" \
            + "&reportType=Raw&startYearMn=2018&startMonthMn=02&endYearMn=2018&endMonthMn=02" \
            + "&startTime=" + startTime \
            + "&endTime=" + endTime \
            + "&dataReportType=_h&showNumRow=100" \
            + "&pageNo=" + str(page) \
            + "&startDateTimeCurrPage=undefined&endDateTimeCurrPage=undefined"

    def get_pm25_info(self, stationId, startDate, startTime, endDate,  endTime, page):

        url = "http://aqmthai.com/includes/getMultiManReport.php"

        # This is the only data required by the api
        # To send back the pm25 info
        raw_data = self.create_raw_data(
            stationId, startDate, startTime, endDate, endTime, page)
        # print(raw_data,"\n")
        headers = {
            'Content-Type': "application/x-www-form-urlencoded",
            'Cache-Control': "no-cache",
        }

        # Making the post request
        response = requests.request(
            "POST", url, data=raw_data, headers=headers)
        # The data that we are looking is in the second
        # Element of the response and has the key 'data',
        # so that is what's returned
        return response.text  # ElementTree.fromstring(response.content)

    def parse_pm25(self, data):
        if data == '':
            sys.exit()
        soup = BeautifulSoup(data, 'lxml')
        AqmthaiScraper.page_total = int(soup.find('pagetotal').string)
        rows = soup.find_all('tr')
        pm25_col = rows[0].find_all('td')[1].string
        for row in rows[1:len(rows)-5]:
            #print(row.find_all('td')[0].string, "\t", row.find_all('td')[1].string)
            date_time = row.find_all('td')[0].string
            pm25 = row.find_all('td')[1].string
            if pm25.replace('.', '', 1).isdigit():
                self.items_list.append(float(pm25))
            if len(self.items_list) > 20:
                self.items_list.pop(0)
            mean_24hr = np.mean(self.items_list)
            pm25_info = {
                'DateTime': date_time[:10].replace(',', '-') + " " + date_time[11:].replace(',', ':'),
                pm25_col: pm25,
                '24hr_average_PM2.5 (ug/m3)': mean_24hr
            }
            self.scaped_pm25.append(pm25_info)

    def save_data(self, stationId, endDate, endTime):
        file = 'pm25_'+stationId+'.json'
        if os.path.isfile(file):
            with open(file, 'r') as json_read:
                unupdated_data = json.load(json_read)
                updated_data = unupdated_data + self.scaped_pm25
                json_read.close()
        else:
            updated_data = self.scaped_pm25

        with open(file, 'w') as json_write:
            json.dump(updated_data, json_write, indent=4)
            json_write.close()

        with open('last_scraping_log.json', 'w') as json_log:
            json.dump({'lastDate': endDate, 'lastTime': endTime},
                      json_log, indent=4)
            json_log.close()

    def run(self, stationId, startDate, startTime):
        endDate = datetime.now().strftime('%Y-%m-%d')
        endTime = datetime.now().strftime('%H:%M:%S')
        # Retrieving the data
        data = self.get_pm25_info(
            stationId, startDate, startTime, endDate, endTime, 1)
        # Parsing it
        self.parse_pm25(data)
        for page in range(2, self.page_total+1):
            # Retrieving the data
            data = self.get_pm25_info(
                stationId, startDate, startTime, endDate, endTime, page)
            # Parsing it
            self.parse_pm25(data)
        self.save_data(stationId, endDate, endTime)
        self.scaped_pm25[:] = []
        self.items_list[:] = []


def check_last_scraping():
    if os.path.isfile('last_scraping_log.json'):
        with open('last_scraping_log.json', 'r') as json_log:
            log = json.load(json_log)
            startDate = log['lastDate']
            startTime = log['lastTime']
    else:
        startDate = '2018-01-01'
        startTime = '00:00:00'
    return {'startDate': startDate, 'startTime': startTime}


if __name__ == '__main__':
    station_list = ('05t', '50t', '52t', '53t', '59t', '61t')
    startDateTime = check_last_scraping()
    for station in station_list:
        scraper = AqmthaiScraper()
        if len(sys.argv) > 1:
            scraper.run(station, sys.argv[1], sys.argv[2])
        else:
            scraper.run(
                station, startDateTime['startDate'], startDateTime['startTime'])
    print('Get New Scraped Data')
