import { JobInterface } from './job.interface';
export class Job implements JobInterface{
    constructor(
        public title: string,
        public desc: string,
        public company_id: number,
        public salary: { min: number, max: number },
        public experience: { min: number, max: number },
    ){}
}
