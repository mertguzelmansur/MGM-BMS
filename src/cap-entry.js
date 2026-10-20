// Capacitor eklentilerini tek dosyada paketler (esbuild) → window.CAP
import { Capacitor } from '@capacitor/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
window.CAP = { Capacitor, BleClient, Filesystem, Directory, Encoding, Share };
