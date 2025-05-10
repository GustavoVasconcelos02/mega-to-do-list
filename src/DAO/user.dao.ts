import prisma from '../utils/prisma_client'

export const createUserDAO = async (name: string, email: string, password: string) => {
    return await prisma.users.create({
        data: {name, email, password}
    })
}; 