# wetransfer-js
## clone
```
git clone https://github.com/stefacc/wetransfer-js
```
and then
```
cd wetransfer-js
npm install
```
## set API key
```
export WT_API_KEY=YOUR_WT_API_KEY
```
## run it
```
node wetransfer.js YOUR-MESSAGE 1st-FILE-TO-SEND [2nd-FILE 3rd-FILE ...]
```
the application gets the current working directory (where you run the application) and adds file path
### example
```
cd /root/dataToSend
node /root/wetransfer-js/wetransfer.js "HI, DOWNLOAD FILES NOW!" ./a.txt ./b.txt
```
`wetransfer.js` uploads `/root/dataToSend/a.txt` and `/root/dataToSend/b.txt`

