export interface DayHours {
  day: string;
  dayShort: string; // 'MON', 'TUE', etc.
  dayIndex: number; // 0 for Sunday, 1 for Monday, etc.
  hours: string;
}

export interface VisitData {
  restaurantName: string;
  subtitle: string;
  addressLine1: string;
  addressLine2: string;
  phoneDisplay: string;
  phoneTel: string;
  googleMapsUrl: string;
  mapEmbedUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  hoursOfOperation: DayHours[];
}

export const VISIT_DATA: VisitData = {
  restaurantName: 'CHENNAI CENTRAL',
  subtitle: 'Indian Restaurant & Banquet',
  addressLine1: '28331 Dodge Dr',
  addressLine2: 'Warrenville, IL 60555',
  phoneDisplay: '(630) 393-6570',
  phoneTel: 'tel:6303936570',
  googleMapsUrl: 'https://maps.app.goo.gl/jQEWagDBRoHXvKHp9',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.289357492813!2d-88.17684612345!3d41.81156827124971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e5676722d3d99%3A0x8bb8c31e217d8338!2s28331%20Dodge%20Dr%2C%20Warrenville%2C%20IL%2060555!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
  instagramUrl: 'https://www.instagram.com/chennaicentral_warrenville',
  facebookUrl: 'https://www.facebook.com/chennaicentralwarrenville',
  hoursOfOperation: [
    { day: 'MONDAY', dayShort: 'MON', dayIndex: 1, hours: '11:30 AM – 3:00 PM\n5:30 PM – 10:00 PM' },
    { day: 'TUESDAY', dayShort: 'TUE', dayIndex: 2, hours: '11:30 AM – 3:00 PM\n5:30 PM – 10:00 PM' },
    { day: 'WEDNESDAY', dayShort: 'WED', dayIndex: 3, hours: '11:30 AM – 3:00 PM\n5:30 PM – 10:00 PM' },
    { day: 'THURSDAY', dayShort: 'THU', dayIndex: 4, hours: '11:30 AM – 3:00 PM\n5:30 PM – 10:00 PM' },
    { day: 'FRIDAY', dayShort: 'FRI', dayIndex: 5, hours: '11:30 AM – 1:00 AM' },
    { day: 'SATURDAY', dayShort: 'SAT', dayIndex: 6, hours: '11:30 AM – 1:00 AM' },
    { day: 'SUNDAY', dayShort: 'SUN', dayIndex: 0, hours: '11:30 AM – 9:00 PM' },
  ],
};
