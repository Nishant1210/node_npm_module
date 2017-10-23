# scribeLogRemover

This module automatically deletes the log files created by Scribe Logger on the servers if the memory utilisation on the server reaches a particular limit. You need to schedule this log remover file on the cronTab on the Linux servers for the period you want the logs to be removed. 

# How it works?

This module delete the previous months file once the memory utilisation for the server has reached 80 percent. You may change this value accordingly.
If the previous months log files are already deleted but still the memory utilisation is high as 80 percent it will keep the latest four days files(by default) and will delete the rest from the current month's folder.

There are three configurable parameters which you need to set and after that you are good to go.

    1. Log path for the log files let logPath = ''
    2. Memory Utilisation value (Set it accordingly. Default Value = 80 percent) result[0].percent
    3. How many days files you want to be in the month folder for SPLUNK or for your convinence for (var i = 0; i < files.length - N; i++) 
