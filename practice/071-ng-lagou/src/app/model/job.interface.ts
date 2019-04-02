export interface JobInterface {
    id?: number
    location_id?: number
    education_level_id?: number
    fulltime?: boolean
    created_at?: string
    job_highlight?: string
    location_detail?: string
    title?: string
    desc?: string
    company_id?: number
    salary?: { min?: number, max?: number }
    experience?: { min?: number, max?: number }
}
