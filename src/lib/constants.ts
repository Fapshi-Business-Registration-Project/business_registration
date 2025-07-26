// /lib/constants.ts

export const BUSINESS_TYPES = [
  { value: 'SARL', label: 'SARL (Ltd)' },
  { value: 'SA', label: 'SA (PLC)' },
  { value: 'GIE', label: 'GIE (Economic Interest Group)' },
  { value: 'ETS', label: 'ETS (Establishment)' },
] as const;

export const CAMEROON_REGIONS = [
  { value: 'adamawa', label: 'Adamawa' },
  { value: 'centre', label: 'Centre' },
  { value: 'east', label: 'East' },
  { value: 'far-north', label: 'Far North' },
  { value: 'littoral', label: 'Littoral' },
  { value: 'north', label: 'North' },
  { value: 'north-west', label: 'North-West' },
  { value: 'south', label: 'South' },
  { value: 'south-west', label: 'South-West' },
  { value: 'west', label: 'West' },
] as const;

export const STEPS = [
  { id: '1', name: 'Business Info', path: 'business-info' },
  { id: '2', name: 'Primary Contact', path: 'primary-contact' },
  { id: '3', name: 'Shareholders', path: 'shareholders' },
  { id: '4', name: 'Documents', path: 'documents' },
  { id: '5', name: 'Summary', path: 'summary' },
];