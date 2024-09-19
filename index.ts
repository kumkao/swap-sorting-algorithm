import _ from 'lodash'

interface IWithPosition {
  position: number
}

function getSwapRecords<T extends IWithPosition>(_data: T[], srcPos: number, destPos: number): T[] {
  const data: T[] = _.cloneDeep(_data)
  if (srcPos < destPos) {
    let srcItem = data.find(item => item.position === srcPos)
    const updatedSrcItem: T = {
      ...srcItem!,
      position: destPos
    }

    return [
      ...data
          .filter(item => item.position >= srcPos + 1 && item.position <= destPos)
          .map(item => {
            item.position--
            return item
          }),
          updatedSrcItem!
    ]
  }
  
  if (srcPos > destPos) {
    let srcItem = data.find(item => item.position === srcPos)
    const updatedSrcItem: T = {
      ...srcItem!,
      position: destPos
    }

    return [
      updatedSrcItem!,
      ...data
          .filter(item => item.position >= destPos && item.position <= srcPos - 1)
          .map(item => {
            item.position++
            return item
          }),
    ]
  }
  return []
}

interface Item extends IWithPosition {
  data: string
}

const data: Item[] = [
  { data: 'A', position: 1 },
  { data: 'B', position: 2 },
  { data: 'C', position: 3 },
  { data: 'D', position: 4 },
  { data: 'E', position: 5 },
]

console.log('getSwapRecords(data, 2,4)', getSwapRecords(data, 2,4))
console.log('getSwapRecords(data, 4,2)', getSwapRecords(data, 4,2))
console.log('getSwapRecords(data, 1,5)', getSwapRecords(data, 1,5))
console.log('getSwapRecords(data, 5,1)', getSwapRecords(data, 5,1))
console.log('getSwapRecords(data, 4,4)', getSwapRecords(data, 4,4))