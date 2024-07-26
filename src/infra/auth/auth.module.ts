import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Env } from "@/infra/env/env";
import { JwtStrategy } from "./jwt.stategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { EnvService } from "../env/env.service";
import { EnvModuele } from "../env/env.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModuele],
      inject: [EnvService],
      global: true,
      useFactory(envService: EnvService) {
        const privateKey = envService.get("JWT_PRIVATE_KEY");
        const publicKey = envService.get("JWT_PUBLIC_KEY");
        return {
          privateKey: Buffer.from(privateKey, "base64"),
          publicKey: Buffer.from(publicKey, "base64"),
          signOptions: {
            algorithm: "RS256",
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EnvService,
    JwtStrategy,
  ],
})
export class AuthModule {}
