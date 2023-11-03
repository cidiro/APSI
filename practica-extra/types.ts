export type Character = {
	name: string;
	race: Race;
	description: number;
	abilities: Ability[];
  };


  export type Ability = {
	name: string;
	description: string;
  };


  export type Race = {
	name: string;
	description: string;
  };
