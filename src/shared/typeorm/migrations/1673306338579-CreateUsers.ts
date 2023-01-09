import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1673306338579 implements MigrationInterface {
  name = 'CreateUsers1673306338579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "avatar" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6d596d799f9cb9dac6f7bf7c23c" DEFAULT getdate(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
