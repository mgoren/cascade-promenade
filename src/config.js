// *********************************************************************************************
// *** NOTE: if change form fields may also need to update OrderSummary and validationSchema ***
// *** ALSO: if add fields, be sure to add them to export at the end of this file            ***
// *********************************************************************************************

import * as Yup from 'yup';

// validation algorithms - can likely leave as-is
const NAME_REGEX = "^[^<>&@]+$";
const PRONOUNS_REGEX = "^[^<>&@]+$";
const PHONE_REGEX = "^[2-9][0-9-() ]*$";
const NAME_VALIDATION = Yup.string().matches(NAME_REGEX, 'Invalid characters :(');
const PRONOUNS_VALIDATION = Yup.string().matches(PRONOUNS_REGEX, 'Invalid characters :(');
const EMAIL_VALIDATION = Yup.string().email('Invalid email address');
const PHONE_VALIDATION = Yup.string().matches(PHONE_REGEX, 'Please enter a valid phone number.');

const ADMISSION_COST_RANGE = [100, 150];
const ADMISSION_COST_DEFAULT = 100;
const ADMISSION_QUANTITY_RANGE = [1, 2];
const DONATION_OPTION = true;
const DONATION_RANGE = [0, 999];

const PAYPAL_OPTIONS = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  "disable-funding": "paylater,credit",
  "enable-funding": "venmo",
  "currency": "USD",
  "locale": "en_US"
};

// this can include config for fields not used in this particular registration instance
const FIELD_CONFIG = {
  first: {
    label: 'First name',
    validation: NAME_VALIDATION.required('Please enter first name.'),
    defaultValue: '',
    order: 1,
    width: 6,
    autoComplete: 'given-name'
  },
  last: {
    label: 'Last name',
    validation: NAME_VALIDATION.required('Please enter last name.'),
    defaultValue: '',
    order: 2,
    width: 6,
    autoComplete: 'family-name'
  },
  nametag: {
    label: 'Name for badge',
    validation: NAME_VALIDATION,
    defaultValue: '',
    order: 3,
    width: 12
  },
  pronouns: {
    label: 'Pronouns for badge',
    validation: PRONOUNS_VALIDATION,
    defaultValue: '',
    order: 4,
    width: 12
  },
  email: {
    label: 'Email',
    type: 'email',
    validation: EMAIL_VALIDATION.required('Please enter email address.'),
    defaultValue: '',
    order: 5,
    width: 12,
    autoComplete: 'email'
  },
  emailConfirmation: {
    label: 'Re-enter email',
    name: 'emailConfirmation',
    type: 'email',
    validation: EMAIL_VALIDATION.required('Please re-enter your email address.').oneOf([Yup.ref('people[0].email'), null], 'Email addresses must match.'),
    defaultValue: '',
    order: 6,
    width: 6,
    autoComplete: 'email'
  },
  phone: {
    label: 'Phone',
    type: 'tel',
    pattern: '###-###-####',
    placeholder: 'e.g. 555-555-5555',
    validation: PHONE_VALIDATION.required('Please enter phone number.'),
    defaultValue: '',
    order: 7,
    width: 12,
    // width: 4,
    autoComplete: 'tel'
  },
  address: {
    label: 'Street address',
    validation: Yup.string().required('Please enter street address.'),
    defaultValue: '',
    order: 8,
    width: 9,
    autoComplete: 'street-address'
  },
  apartment: {
    label: 'Apt, Suite, etc.',
    validation: Yup.string(),
    defaultValue: '',
    order: 9,
    width: 3,
    autoComplete: 'address-line2'
  },
  city: {
    label: 'City',
    validation: Yup.string().required('Please enter city.'),
    defaultValue: '',
    order: 10,
    width: 6,
    // width: 5,
    autoComplete: 'city'
  },
  state: {
    label: 'State / Province',
    validation: Yup.string().required('Please enter state or province.'),
    defaultValue: '',
    order: 11,
    width: 3,
    autoComplete: 'state'
  },
  zip: {
    label: 'Zip / Postal code',
    validation: Yup.string().required('Please enter zip/postal code.'),
    defaultValue: '',
    order: 12,
    width: 3,
    autoComplete: 'postal-code'
  },
  country: {
    label: 'Country',
    validation: Yup.string(),
    defaultValue: '',
    order: 13,
    width: 12,
    autoComplete: 'country',
    hidden: true
  },
}

const DANCES = [
  "The Archer",
  "Bath Carnival",
  "Braye's Maggot"
];

// below is config for this particular registration instance

// order of FIRST_PERSON_FIELDS is used in emailConfirmationIsFirstInvalidField
const FIRST_PERSON_FIELDS = ['first', 'last', 'nametag', 'pronouns', 'email', 'emailConfirmation', 'phone', 'address', 'apartment', 'city', 'state', 'zip', 'country'];
const OTHER_PERSON_FIELDS = ['first', 'last', 'nametag', 'pronouns', 'email', 'phone', 'address', 'apartment', 'city', 'state', 'zip', 'country'];

const PERSON_INPUTS = [
  { label: 'Your contact information', fields: FIRST_PERSON_FIELDS },
  { label: 'Second admission', fields: OTHER_PERSON_FIELDS },
  { label: 'Third admission', fields: OTHER_PERSON_FIELDS },
  { label: 'Fourth admission', fields: OTHER_PERSON_FIELDS },
];

const ORDER_DEFAULTS = {
  people: PERSON_INPUTS.map((person, index) => ({
    ...person.fields.reduce((obj, field) => ({ ...obj, [field]: FIELD_CONFIG[field].defaultValue }), {}),
    index
  })),
  emailConfirmation: '', // because we're overriding this field name so is not part of the people array
  admissionCost: ADMISSION_COST_DEFAULT,
  admissionQuantity: ADMISSION_QUANTITY_RANGE[0],
  donation: DONATION_RANGE[0],
  volunteer: [],
  hospitality: [],
  scholarship: [],
  carpool: [],
  share: ['name', 'email', 'phone', 'location'],
  comments: '',
  workTrade: '',
}

const VOLUNTEER_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No thanks', value: 'no' },
  { label: 'Other (please explain in comments below)', value: 'other' },
  // { label: 'Airport pick-up/drop-off', value: 'airport' },
  // { label: 'Friday pre-ball dance', value: 'friday' },
  // { label: 'Saturday pre-workshop decorating', value: 'saturday-pre' },
  // { label: 'Saturday evening post-ball', value: 'saturday-post' },
  // { label: 'Sunday Brunch setup and/or cleanup', value: 'sunday' },
];

const HOSPITALITY_OPTIONS = [
  { label: 'I can offer housing', value: 'offering' },
  { label: 'I need housing (limited availability)', value: 'requesting' },
];

const SCHOLARSHIP_OPTIONS = [
  { label: 'Yes, please consider me for a scholarship', value: 'yes' },
];

const SHARE_OPTIONS = [
  { label: 'Include my name in the roster', value: 'name' },
  { label: 'Include my email in the roster', value: 'email' },
  { label: 'Include my phone number in the roster', value: 'phone' },
  { label: 'Include my city, state, zip in the roster', value: 'location' },
]

const YES_NO_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const EVENTS = [
  {
    day: 'Sunday, March 3, 2024',
    start: '3:15 PM',
    end: '5:45 PM',
    dance: 'Seattle English Country Dance',
    location: 'University Heights Center<br/>5031 University Way NE, Seattle 98105',
    url: 'https://seattledance.org/english/'
  },
  {
    day: 'Sunday, March 3, 2024',
    start: '6:30 PM',
    end: '10:00 PM',
    dance: 'Portland Contra Remix',
    location: 'Norse Hall upstairs<br/>111 NE 11th Ave, Portland, OR 97232',
    url: 'https://www.contraremix.com/'
  },
  {
    day: 'Monday, March 4, 2024',
    start: '7:00 PM',
    end: '9:00 PM',
    dance: 'Seattle Skandia Folkdance',
    location: 'University Heights Center, room 209<br/>5031 University Way NE, Seattle 98105',
    url: 'https://skandia-folkdance.org/classes.html'
  },
  {
    day: 'Monday, March 4, 2024',
    start: '7:15 PM',
    end: '9:15 PM',
    dance: 'Norske Runddansere. Scandinavian Dance.',
    location: 'Nordia House<br/>8800 SW Oleson Rd, Portland, OR 97223',
    url: 'http://www.norskerunddansere.org/'
  },
  {
    day: 'Monday, March 4, 2024',
    start: '8:00 PM',
    end: '10:30 PM',
    dance: "Lenora's Ballroom Monday dance",
    location: "Lenora's Ballroom<br/>3300 SE Woodward St, Portland, OR 97202",
    url: 'https://www.lenorasballroom.com/'
  },
  {
    day: 'Wednesday, March 6, 2024',
    start: '7:30 PM',
    end: '10:00 PM',
    dance: 'Joyride Contra Dance',
    location: 'Polish Library Association dance hall<br/>3832 N. Interstate Ave, Portland, OR 97227',
    url: 'https://joyride.erikweberg.com/'
  },
  {
    day: 'Thursday, March 7, 2024',
    start: '6:00 PM',
    end: '9:00 PM',
    dance: 'Salem Contra Dance',
    location: 'VFW Hall<br/>630 Hood St. NE, Salem OR 97301',
    url: 'https://pcdc.fun/Salem240307'
  },
  {
    day: 'Thursday, March 7, 2024',
    start: '7:15 PM',
    end: '10:00 PM',
    dance: '16th Lake City Contra Marathon',
    location: 'Benefit for NW Folklife<br/>Seattle Latvian Community Center<br/>11710 3rd Ave NE, Seattle, WA 98125',
    url: 'https://seattledance.org/contra/lakecity/'
  },
  {
    day: 'Friday, March 8, 2024',
    start: '7:00 PM',
    end: '10:00 PM',
    dance: 'Emerald City Contra Dance',
    location: 'Phinney Neighborhood Center<br/>(lower lot brick building)<br/>6532 Phinney Avenue North, Seattle 98103',
    url: 'https://seattledance.org/contra/emeraldcity/'
  },
  {
    day: 'Friday, March 8, 2024',
    start: '7:30 PM',
    end: '10:30 PM',
    dance: 'PCDC Friday Night English Dance',
    location: 'Burlingame Water Tower Dance Hall<br/>8936 SW 17th Ave, Portland OR 97219',
    url: 'https://pcdc.fun/ECD240308'
  },
  {
    day: 'Saturday, March 9, 2024',
    start: '10:00 AM',
    end: '12:00 PM',
    dance: 'Celtic Arts - Scottish Country Dance',
    location: 'Littlefield Celtic Center<br/>1124 Cleveland Ave, Mount Vernon, WA 98273',
    url: 'https://www.celticarts.org/event/march-scottish-country-dance-class'
  },
  {
    day: 'Saturday, March 9, 2024',
    start: '12:30 PM',
    end: '3:30 PM',
    dance: 'Olympia Contra Dance',
    location: 'South Bay Grange<br/>3918 Sleater Kinney Rd NE, Olympia, WA 98506',
    url: 'https://oly-wa.us/southbaygrange/contra.php'
  },
  {
    day: 'Saturday, March 9, 2024',
    start: '7:00 PM',
    end: '10:30 PM',
    dance: 'Portland Megaband Dance',
    location: 'Benefit for PCDC<br/>Smith Ballroom at Portland State University<br/>1825 SW Broadway, Portland, OR 97201',
    url: 'https://portlandmegaband.com/'
  },
  {
    day: 'Saturday, March 9, 2024',
    start: '7:30 PM',
    end: '10:00 PM',
    dance: 'Bellingham Contra Dance',
    location: 'Fairhaven Library<br/>1117 12th St, Bellingham WA 98225',
    url: 'https://bellinghamcountrydance.org/'
  },
  {
    day: 'Sunday, March 10, 2024',
    start: '12:00 PM',
    end: '6:00 PM',
    dance: 'The Portland Roadhouse 2024',
    location: 'Milwaukie Community Club<br/>10666 SE 42nd Ave. Milwaukie, OR 97222',
    url: 'https://portlandroadhouse.org/'
  }
];

// *********************************************************************************************
// ***                           Export fields here if added fields above!                   ***
// *********************************************************************************************
const config = {
  SANDBOX_MODE: true, // for testing only
  SHOW_PRE_REGISTRATION: false,
  NUM_PAGES: 3,
  STEPS: [
    {key: 1, label: 'Contact'},
    {key: 2, label: 'Misc'},
    {key: 3, label: 'Payment'},
    {key: 'checkout', label: 'Checkout'}
  ],
  PAYMENT_METHODS: ['paypal', 'check'], // options are 'stripe', 'paypal', and/or 'check' (first is default)
  TITLE: 'Cascade Promenade 2024',
  // CONFIRMATION_PAYPAL_TITLE: 'Example Dance Weekend Confirmation',
  // CONFIRMATION_CHECK_TITLE: 'Example Dance Weekend Registration',
  // EMAIL_CONTACT: 'contact@example.com',
  // COVID_POLICY_URL: 'example.com/covid',
  // DETAILS_URL: 'example.com',
  // WAIVER_URL: 'example.com/waiver',
  // PAYPAL_ME_URL: 'paypal.me/example',
  // CHECK_TO: 'Check To Example',
  // CHECK_ADDRESS: "Address line 1<br />Address line 2<br />Address line 3<br />Address line 4",
  ADMISSION_COST_RANGE,
  ADMISSION_COST_DEFAULT,
  ADMISSION_QUANTITY_RANGE,
  DONATION_OPTION,
  DONATION_RANGE,
  PAYPAL_OPTIONS,
  FIELD_CONFIG,
  PERSON_INPUTS,
  ORDER_DEFAULTS,
  VOLUNTEER_OPTIONS,
  HOSPITALITY_OPTIONS,
  SCHOLARSHIP_OPTIONS,
  SHARE_OPTIONS,
  YES_NO_OPTIONS,
  DANCES,
  EVENTS,
  // CAPTCHA_KEY: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
  FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID
}

export default config;
