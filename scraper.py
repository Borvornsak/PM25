# Importing the dependencies
# This is needed to create a lxml object that uses the css selector
from xml.etree import ElementTree

# The requests library
import requests


class AqmthaiScraper:

    def get_pm25_info(self, stationId, startDate, endDate, startTime, endTime, page):

        url = "http://aqmthai.com/includes/getMultiManReport.php"

        # This is the only data required by the api
        # To send back the pm25 info
        raw_data = "action=showTable&paramValue=PM2.5%%&endDate=2018-02-17&startDate=2018-01-01&stationId=05t,%%&reportType=Raw&startYearMn=2018&startMonthMn=02&endYearMn=2018&endMonthMn=02&startTime=00:00:00&endTime=15:46:00&dataReportType=_h&showNumRow=100&pageNo=1&startDateTimeCurrPage=undefined&endDateTimeCurrPage=undefined"
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
        return ElementTree.fromstring(response.content)

    def run(self):
        for page in range(1):
            # Retrieving the data
            data = self.get_pm25_info(
                page, '05t', '2018-01-01', '2018-02-17', '00:00:00', '15:46:00')
            # Parsing it
            # self.parse_stores(data)
            print(data)


if __name__ == '__main__':
    scraper = AqmthaiScraper()
    scraper.run()
