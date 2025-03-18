import * as dotenv from 'dotenv';

if (dotenv && typeof dotenv.config === 'function') {
  dotenv.config({ path: '../.env.test' });
} else {
  throw new Error('dotenv is not properly imported or configured.');
}
