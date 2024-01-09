import { EntitySchema } from "typeorm";
import Plague from "../Plague";
import { EntitySchemaType } from "@application/schema/EntitySchemaType";

const plagueSchema = new EntitySchema<EntitySchemaType<Pick<Plague, 'name'>>>({
    name: 'plague',
    columns: {
        id: {
            type: 'uuid',
            unique: true,
            primary: true
        },
        name: {
            type: 'varchar',
            unique: true,
        }
    }
});

export default plagueSchema;