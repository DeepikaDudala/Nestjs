import { Controller, Get } from '@nestjs/common';

@Controller('tests')
export class TestsController {
    @Get()
    getTests(){
        return `hello`
    }
}
