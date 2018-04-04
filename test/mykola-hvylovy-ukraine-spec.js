require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Mykola Hvylovy\'s Information', () => {
    const source = fs.readFileSync('./data/mykola-hvylovy-ukraine.txt', 'utf8');
    const properties = parse(source, { simplifyDataValues: false });

    it('фото', () => {
        properties.general.should.have.property('фото', 'MykolaHvylovyukraine.jpg');
    });

    it('ім\'я', () => {
        properties.general.should.have.property('ім\'я', 'Микола Хвильовий');
    });

    it('підпис', () => {
        properties.general.should.have.property('підпис', 'Микола Хвильовий');
    });

    it('ім\'я при народженні', () => {
        properties.general.should.have.property('ім\'я при народженні', 'Микола Григорович Фітільов');
    });

    it('псевдоніми', () => {
        properties.general.should.have.property('псевдоніми', 'Микола Хвильовий, Уманець Юлія, Кароль Стефан');
    });

    it('поховання', () => {
        properties.general.should.have.property('поховання', 'Перше міське кладовище (нині Молодіжний парк (Харків)) в Харків');
    });

    it('magnum opus', () => {
        properties.general.should.have.property('magnumOpus', '«Я (Романтика)»');
    });

    it('жанр', () => {
        properties.general.should.have.property('жанр');
        properties.general['жанр'].should.containEql('оповідання');
        properties.general['жанр'].should.containEql('новела');
        properties.general['жанр'].should.containEql('роман');
        properties.general['жанр'].should.containEql('повість');
        properties.general['жанр'].should.containEql('вірш');
        properties.general['жанр'].should.containEql('памфлет');
    });

    it('роки активності', () => {
        properties.general.should.have.property('роки активності', '1921—1933');
    });

    it('мова творів', () => {
        properties.general.should.have.property('мова творів', 'українська мова');
    });

    it('громадянство', () => {
        properties.general.should.have.property('громадянство', 'UNR→USSR');
    });

    it('рід діяльності', () => {
        properties.general.should.have.property('рід діяльності');
        properties.general['рід діяльності'].should.containEql('письменник');
        properties.general['рід діяльності'].should.containEql('поет');
        properties.general['рід діяльності'].should.containEql('публіцист');
    });
});
