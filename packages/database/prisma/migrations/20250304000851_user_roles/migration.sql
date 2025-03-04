-- Step 1: Add the new `roles` column with a default value
ALTER TABLE "User" 
ADD COLUMN "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[];

-- Step 2: Migrate data from the `role` column to the `roles` column
UPDATE "User" 
SET "roles" = ARRAY["role"]::"Role"[]
WHERE "role" IS NOT NULL;

-- Step 3: Drop the old `role` column
ALTER TABLE "User" 
DROP COLUMN "role";