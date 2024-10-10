require('should')
import fs from 'fs';
import parse from '../index';

describe("Should Parse camera lens information", () => {
    const source = fs.readFileSync('./data/camera-lens.txt', 'utf8')
    const properties = parse(source)

    it('should parse n as false', () => {
        properties.general.should.have.property('featAr', false)
    })

    it('should parse y as true', () => {
        properties.general.should.have.property('featIs', true)
    })
})
