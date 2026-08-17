import type { SchemaTypeDefinition } from "sanity"

import blockContent from "./blockContent"
import post from "./post"
import pressRelease from "./pressRelease"

export const schemaTypes: SchemaTypeDefinition[] = [post, pressRelease, blockContent]
