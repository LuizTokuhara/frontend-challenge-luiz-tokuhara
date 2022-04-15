import { HolidaysList } from "../models/holidays.interface";

export const HolidaysListMock: HolidaysList = {
  holidays: [
    {
        date: '2022-01-01',
        name: 'New Years Day',
        local_name: 'New Years Day',
        country_code: 'GB',
        regions: [
            'GB-NIR'
        ],
        types: [
            'Public'
        ]
    },
    {
        date: '2022-01-03',
        name: 'New Years Day',
        local_name: 'New Years Day',
        country_code: 'GB',
        regions: [
            'GB-ENG',
            'GB-WLS'
        ],
        types: [
            'Public'
        ]
    }
  ]
}