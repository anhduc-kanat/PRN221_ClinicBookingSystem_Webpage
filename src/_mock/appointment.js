import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const phone = [
'1233444',
'1233244',
'1239444',
'1455444',
'12334994',
'1233044',
];
export const appointments = [...Array(25)].map((_, index) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: phone[index],
    slot: sample(['confirmed', 'pending', 'cancelled']),
    visitDate: sample(['confirmed', 'pending', 'cancelled']), // YYYY-MM-DD format
    visitTime: sample(['confirmed', 'pending', 'cancelled']), // HH:00 format for simplicity
    status: sample(['confirmed', 'pending', 'cancelled']),
    dentist: faker.person.fullName(),
    serviceType: sample(['cleaning', 'whitening', 'extraction', 'checkup']),
    description: faker.lorem.sentence(),
  }));