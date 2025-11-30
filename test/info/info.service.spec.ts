import { InfoService } from 'src/info/services/info.service';
import {
  expectedSuccessResponse,
  generateDateOfBirth,
  maxAge,
  maxNameLength,
  minAge,
  minNameLength,
} from './helper';
import { RuleEngineService } from 'src/info/services/rule-engine.service';
import { InfoRuleProvider } from 'src/info/rules/rule-injectable';
import { Test } from '@nestjs/testing';

describe('InfoService tests', () => {
  let infoService: InfoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [InfoService, RuleEngineService, InfoRuleProvider],
    }).compile();

    infoService = module.get(InfoService);
  });

  describe('validate', () => {
    const validAge = 20;
    const validDateOfBirth: Date = generateDateOfBirth(validAge);

    const validName = 'valid_name';
    const validMarried = false;

    const failValue = false;

    it('given valid data, should return successValue', async () => {
      const validInputData = {
        name: validName,
        age: validAge,
        married: validMarried,
        dateOfBirth: validDateOfBirth,
      };

      const response = await infoService.validateInfo(validInputData);
      expect(response).toEqual(expectedSuccessResponse(validInputData));
    });

    it('given age as string, should validate successfully', async () => {
      const inputDataWithAgeAsString = {
        name: validName,
        age: '20',
        married: validMarried,
        dateOfBirth: validDateOfBirth,
      };

      expect(typeof inputDataWithAgeAsString.age).toBe('string');

      const response = await infoService.validateInfo(inputDataWithAgeAsString);

      expect(response).toEqual({
        success: true,
        data: {
          ...inputDataWithAgeAsString,
          age: Number(inputDataWithAgeAsString.age),
        },
      });
    });

    it('given age < 18, married field can be null', async () => {
      const age = 17;
      const dateOfBirth: Date = generateDateOfBirth(age);

      const inputDataWithMarriedAsNull = {
        name: validName,
        age: age,
        married: null,
        dateOfBirth: dateOfBirth,
      };

      const response = await infoService.validateInfo(
        inputDataWithMarriedAsNull,
      );
      expect(response).toEqual(
        expectedSuccessResponse(inputDataWithMarriedAsNull),
      );
    });

    describe('validation fails', () => {
      it('given name length < 5, should fail validation', async () => {
        const inputDataWithInvalidNameLength = {
          name: 'err',
          age: validAge,
          married: validMarried,
          dateOfBirth: validDateOfBirth,
        };

        expect(inputDataWithInvalidNameLength.name.length).toBeLessThan(
          minNameLength,
        );

        const response = await infoService.validateInfo(
          inputDataWithInvalidNameLength,
        );

        expect(response.success).toBe(failValue);
        expect(response.errors).not.toBe(0);
      });

      it('given name length > 50, should fail validation', async () => {
        const inputDataWithInvalidNameLength = {
          name: 'mZ4pQv8sLk2dRj1tXh9bCw3yTf6uEn5aVo7gMi0lPsQxNrBeWcl',
          age: validAge,
          married: validMarried,
          dateOfBirth: validDateOfBirth,
        };

        expect(inputDataWithInvalidNameLength.name.length).toBeGreaterThan(
          maxNameLength,
        );

        const response = await infoService.validateInfo(
          inputDataWithInvalidNameLength,
        );

        expect(response.success).toBe(failValue);
        expect(response.errors.length).not.toBe(0);
      });

      it('given age < 1, should fail validation', async () => {
        const invalidAge = 0;
        const dateOfBirth: Date = generateDateOfBirth(invalidAge);

        const inputDataWithInvalidAge = {
          name: validName,
          age: invalidAge,
          married: validMarried,
          dateOfBirth: dateOfBirth,
        };

        expect(inputDataWithInvalidAge.age).toBeLessThan(minAge);

        const response = await infoService.validateInfo(
          inputDataWithInvalidAge,
        );

        expect(response.success).toBe(failValue);
        expect(response.errors.length).not.toBe(0);
      });

      it('given age > 150, should fail validation', async () => {
        const invalidAge = 151;
        const dateOfBirth: Date = generateDateOfBirth(invalidAge);

        const inputDataWithInvalidAge = {
          name: validName,
          age: invalidAge,
          married: validMarried,
          dateOfBirth: dateOfBirth,
        };

        expect(inputDataWithInvalidAge.age).toBeGreaterThan(maxAge);

        const response = await infoService.validateInfo(
          inputDataWithInvalidAge,
        );

        expect(response.success).toBe(failValue);
        expect(response.errors.length).not.toBe(0);
      });

      it('given age > 18 and married is null, should fail validation', async () => {
        const inputDataWithInvalidMarriedValue = {
          name: validName,
          age: validAge,
          married: null,
          dateOfBirth: validDateOfBirth,
        };

        expect(inputDataWithInvalidMarriedValue.age).toBeGreaterThanOrEqual(18);

        const response = await infoService.validateInfo(
          inputDataWithInvalidMarriedValue,
        );

        expect(response.success).toBe(failValue);
        expect(response.errors.length).not.toBe(0);
      });

      it('given age as text, should fail validation', async () => {
        const inputDataWithAgeAsText = {
          name: validName,
          age: 'twenty',
          married: validMarried,
          dateOfBirth: validDateOfBirth,
        };

        expect(typeof inputDataWithAgeAsText.age).toBe('string');
        const response = await infoService.validateInfo(inputDataWithAgeAsText);

        expect(response.success).toBe(failValue);
        expect(response.errors.length).not.toBe(0);
      });

      it('given dateOfBirth not passed, should fail validation', async () => {
        const invalidAge = -2;
        const invalidDateOfBirth: Date = generateDateOfBirth(invalidAge);
        const inputDataWithInvalidDateOfBirth = {
          name: validName,
          age: invalidAge,
          married: validMarried,
          dateOfBirth: invalidDateOfBirth,
        };

        const isFuture: boolean = invalidDateOfBirth.getTime() > Date.now();

        expect(isFuture).toBe(true);

        const response = await infoService.validateInfo(
          inputDataWithInvalidDateOfBirth,
        );

        expect(response.success).toBe(failValue);
        expect(response.errors.length).not.toBe(0);
      });

      it('given incompatible dateOfBirth and age, should fail validation', async () => {
        const invalidDateOfBirth: Date = new Date();
        const inputDataWithInvalidDateOfBirth = {
          name: validName,
          age: validAge,
          married: validMarried,
          dateOfBirth: invalidDateOfBirth,
        };

        const response = await infoService.validateInfo(
          inputDataWithInvalidDateOfBirth,
        );

        expect(response.success).toBe(failValue);
        expect(response.errors.length).not.toBe(0);
      });
    });
  });
});
