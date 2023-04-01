import { State } from '@prisma/client';

export const messages: Record<State, string> = {
  good: "D'après nos relevés, la qualité de l'eau est revenue à la normale dans votre commune.",
  bad: "D'après nos relevés, il n'est pas recommandé de donner l'eau du robinet aux enfants en bas âge et femmes enceinte.",
};
