import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;
  beforeEach(() => {
    service = new UtilityService();
  });

  it('#getValue should return real value', () => {
    expect(service.getCheckboxTypeValue('a,b')).toEqual([
      { name: 'a', isChecked: false },
      { name: 'b', isChecked: false },
    ]);
  });
});
