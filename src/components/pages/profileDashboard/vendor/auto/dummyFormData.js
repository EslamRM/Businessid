const addProducts = {
  is_limited: "unlimited",
  visibility: "public",
  stock_location_id: "3",
  brand: "amptech",
  shipping_type: "free_shipping",
  market_type: "supply",
  product_type: "item",
  name: "Heater",
  categories: [
    "Consumer Electronics",
    "Home Appliance",
    "Home Heaters",
    "Gas Heaters"
  ],
  tags: ["water heater", "best"],
  item_length: "20",
  item_width: "20",
  item_height: "20",
  item_weight: "20",
  quantity: "",
  product_attributes: [
    { "20'gp": "630PCS" },
    { "40hq": "1500PCS" },
    { advantage: "Infrared" }
  ],
  price: "500.00",
  offerprice: "400.00",
  currency: "INR",
  minimumorder: "2",
  valid_till: "",
  vat: "15",
  files: [
    process.env.BASE_URL + "assets/uploads/06Nov2020230355_Ik4UHBBOQt.blob"
  ],
  information: "<p>Best Water Heater</p>",
  location_country: "United Arab Emirates",
  location_city: "Dubai",
  location_area: "Deira",
  // lastCategoryName: "Gas Heaters",
  unit: "Piece"
};

const formData = {
  market_type: "supply",
  product_type: "auto",
  category: "Cars",
  name: "Mercedes Benz",
  brand: "Alfa Romeo",
  make: "Alfa Romeo",
  manufacturer: "Alfa Romeo",
  sub_category: "Alfa Romeo",
  model: "A5",
  auto_type: "Used",
  auto_purpose: "Rent",
  price: "5000",
  offerprice: "4000",
  currency: "AED",
  vat: "25",
  tags: ["asa"],
  visibility: "Public",
  kilometers: "500",
  information: this.form.information,
  files: [
    process.env.BASE_URL + "assets/uploads/10Oct2020164911_LCOJ8qxu5Y.blob",
    process.env.BASE_URL + "assets/uploads/10Oct2020165052_cxJQnh5clT.blob"
  ],
  auto_features: ["All Wheel Drive"],
  contact_name: "Abhishek",
  contact_number: "072269 45005",
  contact_email: "asamnb@asa.com",
  address: "Savli",
  latitude: 22.2969099,
  longitude: 73.12113029999999,
  location_country: "United Arab Emirates",
  location_area: "Al Butina",
  location_city: "Sharjah",
  body_type: "Crossover",
  doors: "2 door",
  cylinders: "3",
  horsepower: "Less than 150 HP",
  transmission_type: "Manual Transmission",
  colors: "Burgundy",
  warranty: "No",
  fuel_type: "Diesel",
  regional_specs: "Japanese Specs",
  body_condition: "Some Parts Damaged",
  mechanical_condition: "Average",
  length: "Medium Length (SUV)",
  wheels: 3,
  capacity: 2,
  engine_size: "500-1000 cc",
  usage: "2",
  drive_system: "20",
  color: "green",
  year: "2020-10-05",
  payment_method: this.form.payment_method,
  no_of_cheques: this.form.no_of_cheques
};

const accessories = {
  market_type: "supply",
  product_type: "auto",
  category: "Accessories & Spare Parts",
  name: "Exhaust",
  model: "",
  auto_type: "New",
  auto_purpose: "Sale",
  price: "200",
  offerprice: "100",
  currency: "AED",
  vat: "20",
  payment_method: "Online",
  no_of_cheques: "",
  tags: ["asas"],
  visibility: "Public",
  kilometers: "",
  information: "<p>best</p>",
  files: [],
  auto_features: ["Alarm/Anti-Theft System"],
  contact_name: "Abhishek",
  contact_number: "05855 452 690",
  contact_email: "ASa",
  address: "Cfg",
  latitude: 22.3149458,
  longitude: 73.1134541,
  location_country: "United Arab Emirates",
  location_area: "Al Hudaihbah",
  location_city: "Ras Al Khaimah",
  body_condition: "",
  mechanical_condition: "Excellent or better",
  length: "",
  wheels: "",
  capacity: "",
  engine_size: "",
  usage: "Used once or less",
  drive_system: ""
};

const number_plate = {
  market_type: "supply",
  product_type: "auto",
  category: "Number Plates",
  name: "number platw",
  brand: "Ajman Plate",
  make: "Ajman Plate",
  manufacturer: "Ajman Plate",
  sub_category: "Ajman Plate",
  model: "Private Car",
  auto_type: "Used",
  auto_purpose: "Rent",
  price: "200",
  offerprice: "100",
  currency: "EGP",
  vat: "2",
  payment_method: "Online",
  no_of_cheques: "",
  tags: ["aas\\"],
  visibility: "Public",
  kilometers: "",
  information: "<p>adsad</p>",
  files: [
    process.env.BASE_URL + "assets/uploads/11Oct2020000335_nh0GQYuGSq.blob"
  ],
  auto_features: ["Alarm/Anti-Theft System"],
  contact_name: "asa",
  contact_number: "05855 452 690",
  contact_email: "asa@asa.com",
  address: "Cfg",
  latitude: 22.3461792,
  longitude: 73.1405431,
  location_country: "United Arab Emirates",
  location_area: "Al Maqam",
  location_city: "Al Ain",
  usage: "2",
  year: "2020-10-21"
};

const property = {
  market_type: "demand",
  product_type: "property",
  name: "Abhishek's Villa",
  listed_by: "Amptech Group",
  till_date: "2020-11-26T15:22:29.825Z",
  property_purpose: "Property for Rent",
  property_category: "Residential Units for Rent",
  property_type: "Villa/House for Rent",
  area_unit: "Sq. foot (ft²)",
  area_size: "1500",
  bedrooms: 3,
  bathrooms: 2,
  attached_kitchen: "no",
  is_furnished: "no",
  is_parking: "no",
  property_amenities: ["Balcony", "Built in Wardrobes"],
  tags: [],
  price: "5000",
  offerprice: "4000",
  currency: "AED",
  vat: "18",
  payment_type: "Cheque",
  payment_method: "Cheque",
  no_of_cheques: "2",
  unit: "8 months",
  payment_plan: "5 months",
  visibility: "Public",
  information: "<p>Best Place Best Price.</p>",
  files: [
    process.env.BASE_URL + "assets/uploads/26Nov2020192428_nH8b6V4anz.blob"
  ],
  contact_name: "Abhishek Patel",
  contact_number: "123456789",
  contact_email: "abhi@gmail.com",
  address: "Shubhanpura, Gorwa Vadodara",
  latitude: 22.3185094,
  longitude: 73.13227959999999,
  location_country: "United Arab Emirates",
  location_area: "Al Ain Industrial Area",
  location_city: "Al Ain"
};