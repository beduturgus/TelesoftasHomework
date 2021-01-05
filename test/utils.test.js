const {get_type, get_day_count, get_name, get_quality, get_sellIn} = require('../src/utils')

describe('Utils tests', () => {

  it('get_sellin returns expected value', () => {
    expect(get_sellIn('Hand of Ragnaros#4#2#1')).toBe("4")
  })

  it('get_day_count returns expected value', () => {
    expect(get_day_count('Hand of Ragnaros#4#2#1')).toBe("1")
  })

  it('get_name returns expected value', () => {
    expect(get_name('Hand of Ragnaros#4#2#1')).toBe("Hand of Ragnaros")
  })

  it('get_quality returns expected value', () => {
    expect(get_quality('Hand of Ragnaros#4#2#1')).toBe("2")
  })

  it('get_type returns other type', () => {
    expect(get_type('Hand of Ragnaros#4#2#1')).toBe("other")
  })

  it('get_type returns sulfuras value', () => {
    expect(get_type('Sulfuras#4#2#1')).toBe("sulfuras")
  })

  it('get_type returns conjured value', () => {
    expect(get_type('Conjured#4#2#1')).toBe("conjured")
  })

  it('get_type returns aged brie value', () => {
    expect(get_type('Aged brie#4#2#1')).toBe("aged brie")
  })

  it('get_type returns backstage passes value', () => {
    expect(get_type('Backstage passes#4#2#1')).toBe("backstage passes")
  })
})