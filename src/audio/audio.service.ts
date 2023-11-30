import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandOutput,
} from '@aws-sdk/client-polly';
import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class AudioService {
  private readonly region = process.env.AWS_REGION;
  private readonly bucket = process.env.AWS_BUCKET_NAME;
  private readonly s3Client = new S3Client({
    region: this.region,
  });
  private readonly pollyClient = new PollyClient({
    region: this.region,
  });

  async getUrl(text: string): Promise<string> {
    const fileName = `${text}.mp3`;
    const fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileName}`;

    if (await this.existsInS3(fileName)) {
      return fileUrl;
    }

    const speech = await this.synthesizeSpeech(text);

    await this.upload(fileName, speech.AudioStream as ReadableStream);
    return fileUrl;
  }

  private async existsInS3(fileName: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: fileName,
        }),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  private async synthesizeSpeech(
    text: string,
  ): Promise<SynthesizeSpeechCommandOutput> {
    return this.pollyClient.send(
      new SynthesizeSpeechCommand({
        OutputFormat: 'mp3',
        Text: text,
        VoiceId: 'Joanna',
      }),
    );
  }

  private async upload(fileName: string, file: ReadableStream) {
    const uploadResult = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
      },
    });
    await uploadResult.done();
  }
}
