import { ArraySortPipe } from './sort-filter.pipe';

describe('SortFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ArraySortPipe();
    expect(pipe).toBeTruthy();
  });
});
