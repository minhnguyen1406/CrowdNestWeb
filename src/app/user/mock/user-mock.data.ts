import { UserModel } from '../../models/user.model';

export const USERDATA: UserModel[] = [
    {id: 1, username : 'admin', password: 'admin', firstName: 'administrator', lastName: 'super user', email: 'admin@test.com', eventId: []},
    {id: 2, username : 'test', password: 'test', firstName: 'test', lastName: 'test user', email: 'test@test.com', eventId: []}
];