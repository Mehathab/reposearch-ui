import repoService, { GetReposParams } from './repo';

describe('repoSearch-service', () => {
  describe('getRepos', () => {
    it('should be defined', () => {
      expect(repoService.getRepos({} as GetReposParams)).toBeDefined();
    });
  });
});
