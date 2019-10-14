function _dbManager_CreateDBBackupAllTables(imgWait, clpanelContainer) {
 
    var valueStream = 'backupDBPathǵ' + BackupDBPath + 'ǴbackupDBFolderNameǵ' + BackupDBFolderName;
    _postData(AzinCreateDBBackup_Url, '', imgWait, clpanelContainer, null, null, null, valueStream);
}

