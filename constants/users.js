import { faker } from "@faker-js/faker";

function generateFakeUsers(count = 10) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    avatar: faker.image.avatar(),
  }));
}

export const fakeUsers = generateFakeUsers(10);
