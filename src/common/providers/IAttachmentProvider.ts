export default interface IAttachmentProvider {
    save(data: string): Promise<string>;
    remove(fileName: string): Promise<void>;
}