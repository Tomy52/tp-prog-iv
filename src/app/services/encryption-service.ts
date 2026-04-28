import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private secretKey = environment.encryptionKey;  
 
  constructor() { }  
 
  /**  
   * Encrypt data and save to local storage  
   * @param key - Local storage key  
   * @param data - Data to encrypt (object, string, number, etc.)  
   */  
  setItem(key: string, data: any): void {  
    try {  
      // Convert data to string (handles objects/arrays)  
      const dataString = JSON.stringify(data);  
      // Encrypt using AES  
      const encryptedData = CryptoJS.AES.encrypt(  
        dataString,  
        this.secretKey
      ).toString();  
      // Save to local storage  
      localStorage.setItem(key, encryptedData);  
    } catch (error) {  
      console.error('Error encrypting and saving data:', error);  
    }  
  }  
 
  /**  
   * Retrieve and decrypt data from local storage  
   * @param key - Local storage key  
   * @returns Decrypted data (parsed back to original type)  
   */  
  getItem(key: string): any {  
    try {  
      // Get encrypted data from local storage  
      const encryptedData = localStorage.getItem(key);  
      if (!encryptedData) return null;  
 
      // Decrypt data  
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);  
      const decryptedDataString = decryptedBytes.toString(CryptoJS.enc.Utf8);  
 
      // Parse back to original data type (object/array/string)  
      return JSON.parse(decryptedDataString);  
    } catch (error) {  
      console.error('Error decrypting data:', error);  
      return null;  
    }  
  }
}
