import { BaseResponse } from 'src/interfaces';
import { NameService } from 'src/name/services/name.service';

describe('NameService tests', () => {
  let nameService: NameService;

  beforeEach(() => {
    nameService = new NameService();
  });

  describe('validate', () => {
    const successValue = true;
    const failValue = false;

    it('given valid name, should return successValue', async () => {
      const name = 'valid_name';
      const expectedResult: BaseResponse = {
        success: successValue,
        data: { name: name },
      };

      expect(await nameService.validateName({ name: name })).toEqual(
        expectedResult,
      );
    });

    it('given empty name, should return failValue', async () => {
      const emptyName = '';

      const response: BaseResponse = await nameService.validateName({
        name: emptyName,
      });

      expect(response.success).toBe(failValue);
    });

    it('given a string with length < 3, should return failvalue', async () => {
      const shortName = 'na';

      const response: BaseResponse = await nameService.validateName({
        name: shortName,
      });

      expect(response.success).toBe(failValue);
    });
  });
});
