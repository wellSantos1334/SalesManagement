import { MigrationInterface, QueryRunner } from 'typeorm';

export class Teste1672198117126 implements MigrationInterface {
  name = 'Teste1672198117126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "name" nvarchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "price" decimal NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "DF_995d8194c43edfc98838cabc5ab"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "created_at" datetime2 NOT NULL CONSTRAINT "DF_995d8194c43edfc98838cabc5ab" DEFAULT getdate()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "DF_655479822939d59ee88d665d7bb"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updated_at" datetime2 NOT NULL CONSTRAINT "DF_655479822939d59ee88d665d7bb" DEFAULT getdate()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "DF_655479822939d59ee88d665d7bb"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" datetime`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "DF_655479822939d59ee88d665d7bb" DEFAULT getdate() FOR "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "DF_995d8194c43edfc98838cabc5ab"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "created_at" datetime`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "DF_995d8194c43edfc98838cabc5ab" DEFAULT getdate() FOR "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "price" decimal(10,2) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "name" varchar(255) NOT NULL`,
    );
  }
}
