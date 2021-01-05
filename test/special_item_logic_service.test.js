const {logic_object, apply_special_item_rules} =  require('../src/services/special_item_logic_service')

describe('Special item logic service tests', () => {
  it('aged brie should reduce sellIn and increase quality', () => {
    const res = logic_object["aged brie"]({name: "aged brie", sellIn: "10", quality: "48"})
    expect(res.sellIn).toBe("9")
    expect(res.quality).toBe("49")
  });

  it('aged brie max quality 50 and min sellIn 0', () => {
    const res = logic_object["aged brie"]({name: "aged brie", sellIn: "0", quality: "50"})
    expect(res.sellIn).toBe("0")
    expect(res.quality).toBe("50")
  });

  it('backstage passes reduce quality by 1 when sellIn > 10', () => {
    const res = logic_object["backstage passes"]({name: "backstage passes", sellIn: "11", quality: "30"})
    expect(res.sellIn).toBe("10")
    expect(res.quality).toBe("31")
  })

  it('backstage passes reduce quality by 2 when sellIn is 10', () => {
    const res = logic_object["backstage passes"]({name: "backstage passes", sellIn: "10", quality: "30"})
    expect(res.sellIn).toBe("9")
    expect(res.quality).toBe("32")
  })

  it('backstage passes reduce quality by 3 when sellIn is 5', () => {
    const res = logic_object["backstage passes"]({name: "backstage passes", sellIn: "5", quality: "30"})
    expect(res.sellIn).toBe("4")
    expect(res.quality).toBe("33")
  })

  it('backstage passes reduce quality to 0 when sellIn is 0 and sellIn cannot get lower than 0', () => {
    const res = logic_object["backstage passes"]({name: "backstage passes", sellIn: "0", quality: "30"})
    expect(res.sellIn).toBe("0")
    expect(res.quality).toBe("0")
  })

  it('backstage passes quality can not be higher than 50', () => {
    const res = logic_object["backstage passes"]({name: "backstage passes", sellIn: "2", quality: "50"})
    expect(res.sellIn).toBe("1")
    expect(res.quality).toBe("50")
  })

  it('conjured quality reduce by 2 when sellIn not expired', () => {
    const res = logic_object["conjured"]({name: "conjured", sellIn: "2", quality: "50"})
    expect(res.sellIn).toBe("1")
    expect(res.quality).toBe("48")
  })

  it('conjured quality reduce by 4 when sellIn expired and sellIn cannot get lower than 0', () => {
    const res = logic_object["conjured"]({name: "conjured", sellIn: "0", quality: "50"})
    expect(res.sellIn).toBe("0")
    expect(res.quality).toBe("46")
  })

  it('conjured quality cannot get higher than 50', () => {
    const res = logic_object["conjured"]({name: "conjured", sellIn: "0", quality: "50"})
    expect(res.sellIn).toBe("0")
    expect(res.quality).toBe("46")
  })

  it('sulfuras quality is always 80 and sellIn does not change', () => {
    const res = logic_object["sulfuras"]({name: "sulfuras", sellIn: "10", quality: "50"})
    expect(res.sellIn).toBe("10")
    expect(res.quality).toBe("80")
  })

  it('apply_special_item_rules return input when item is not special item', () => {
    const res = apply_special_item_rules({name: "foo", sellIn: "10", quality: "50"})
    expect(res.name).toBe("foo")
    expect(res.sellIn).toBe("10")
    expect(res.quality).toBe("50")
  })

  it('apply_special_item_rules apply rule when name is in capital letters', () => {
    const res = apply_special_item_rules({name: "CONJURED", sellIn: "0", quality: "50"})
    expect(res.name).toBe("CONJURED")
    expect(res.sellIn).toBe("0")
    expect(res.quality).toBe("46")
  })


})