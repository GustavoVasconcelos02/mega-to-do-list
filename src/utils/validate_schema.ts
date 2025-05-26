import { z } from 'zod';
import { Response } from 'express';

// Valida os dados com base no schema Zod; retorna os dados validados ou erro 400
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: any, res: Response): T | null => {
  const result = schema.safeParse(data);

  if (!result.success) {
    res.status(400).json({ error: 'Dados inválidos', details: result.error.errors });
    return null;
  }

  return result.data;
};