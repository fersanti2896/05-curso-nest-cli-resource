import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'  
        }
    ];

    findAll() {
        return this.cars;
    }   

    findById( id: string ) {
        const car = this.cars.find( car => car.id === id  );

        if( !car ) throw new NotFoundException(`No existe el carro con el id: ${ id }`);
        
        return car
    }

    create( createCarDTO: CreateCarDTO ) {
        const carExists = this.cars.find( car => car.model == createCarDTO.model );

        if( carExists ) throw new BadRequestException(`El carro con modelo: ${ createCarDTO.model } ya existe.`);

        const car: Car = {
            id: uuid(),
            ...createCarDTO
        }

        this.cars.push( car );

        return car;
    }

    update( id: string, updateCarDTO: UpdateCarDTO ) {
        let carDB = this.findById( id );
        
        if( updateCarDTO.id && updateCarDTO.id !== id )
            throw new BadRequestException(`Car id is not valid inside body`);

        this.cars = this.cars.map( car => {
            if ( car.id === id ) {
                carDB = { ...carDB,...updateCarDTO, id }
                return carDB;
            }

            return car;
        });
        
        return carDB;
    }

    delete( id: string ) {
        const car = this.findById( id );
        
        this.cars = this.cars.filter( car => car.id !== id );
    }
}
