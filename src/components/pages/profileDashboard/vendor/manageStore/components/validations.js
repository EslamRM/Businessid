import {
  required,
  maxLength,
  minLength,
  maxValue,
  minValue,
  numeric,
  checked
} from "vuelidate/lib/validators";
const Cars = {
  body_type: { required },
  doors: { required },
  cylinders: { required },
  horsepower: { required },
  transmission_type: { required },
  color: { required },
  warranty: { required },
  fuel_type: { required },
  regional_specs: { required },
  body_condition: { required },
  mechanical_condition: { required },
  length: { required },
  capacity: { required },
  wheels: { required },
  engine_size: { required },
  drive_system: { required }
};
const AccessoriesAndSpareParts = {
  mechanical_condition: { required },
  usage: { required },
  allCategoriesSelected: {
    checked: value => value === true
  },
  brand: { required },
  item_length: { required, numeric, minValue: minValue(0.1) },
  item_width: { required, numeric, minValue: minValue(0.1) },
  item_height: { required, numeric, minValue: minValue(0.1) },
  item_weight: { required, numeric, minValue: minValue(0.1) }
};
const Boats = {
  age: {
    required
  },
  body_condition: {
    required
  },
  usage: {
    required
  },
  length: {
    required
  },
  warranty: {
    required
  },
  fuel_type: {
    required
  },
  mechanical_condition: {
    required
  },
  capacity: {
    required
  },
  engine_size: {
    required
  },
  drive_system: {
    required
  }
};
const Motorcycles = {
  drive_system: {
    required
  },
  wheels: {
    required
  },
  usage: {
    required
  },
  manufacturer: {
    required
  },
  engine_size: {
    required
  },
  warranty: {
    required
  },
  color: {
    required
  },
  fuel_type: {
    required
  },
  body_condition: {
    required
  },
  mechanical_condition: {
    required
  },
  capacity: {
    required
  }
};
//Cars & Heavy Vehicles Same
export { Cars, AccessoriesAndSpareParts, Boats, Motorcycles };
