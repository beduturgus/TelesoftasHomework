const {perform_daily_reduction, perform_update,update_stream } = require('../src/services/transform_streams_service')
const {Readable} = require('stream')

const MemoryStream = require('memorystream');
const memStream = MemoryStream.createWriteStream();

describe('Transform streams service tests', () => {

  it('update stream should provide correct file', () => {
    const input = "foo#18#4#1"
    const in_stream = new Readable({
      read() {}
    })
    in_stream.pipe(update_stream).pipe(memStream).on('finish', () => {
      expect(memStream.toString()).toBe("{\"name\":\"foo\",\"sellIn\":\"17\",\"quality\":\"3\"}")
    })
    in_stream.push(input)
    in_stream.push(null)
  })

  it('should reduce sellIn and quality by 1 when sellIn is > 0', () => {
    const item = {name: "foo", sellIn: "5", quality: "25"}
    perform_daily_reduction(item)
    expect(item.name).toBe("foo")
    expect(item.sellIn).toBe("4")
    expect(item.quality).toBe("24")
  })

  it('should reduce quality by 2 when sell in is <= 0', () => {
    const item = {name: "foo", sellIn: "0", quality: "25"}
    perform_daily_reduction(item)
    expect(item.sellIn).toBe("0")
    expect(item.quality).toBe("23")
  })

  it('perform_daily_reduction should apply daily reduction for regular item', () => {
    const res = perform_update({name: "foo", sellIn: "10", quality: "25"}, 1)
    expect(res).toStrictEqual({name: "foo", sellIn: "9", quality: "24"})
  })

  it('perform_daily_reduction should perform daily reduction for regular items for 10 days', () => {
    const res = perform_update({name: "foo", sellIn: "5", quality: "25"}, 10)
    expect(res).toStrictEqual({name: "foo", sellIn: "0", quality: "10"})
  })

  it('special item rule should be applied for aged brie correctly for 10 days', () => {
    const res = perform_update({name: "Aged brie", sellIn: "5", quality: "25"}, 10)
    expect(res).toStrictEqual({ name: 'Aged brie', sellIn: '0', quality: '35' })
  })

  it('special item rule should be applied for conjured correctly for 10 days', () => {
    const res = perform_update({name: "Conjured", sellIn: "5", quality: "25"}, 10)
    expect(res).toStrictEqual({ name: 'Conjured', sellIn: '0', quality: '0' })
  })

  it('special item rule should be applied for backstage passes correctly for 10 days', () => {
    const res = perform_update({name: "Backstage passes", sellIn: "20", quality: "25"}, 10)
    expect(res).toStrictEqual({ name: 'Backstage passes', sellIn: '10', quality: '35' })
  })
})