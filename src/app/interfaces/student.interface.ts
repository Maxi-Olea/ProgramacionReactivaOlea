export interface Student {
    id: number;
    name: string;
    lastname: string;
    email: string;
    birthday?: Date;
    cursos?: string[];
}