<img width="868" height="425" alt="image" src="https://github.com/user-attachments/assets/ad337728-9fc2-4827-9833-fba1bf7783ca" /># TodoApp

## アプリ概要

本アプリは、React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。<br>
その時にできた予定・仕事・課題などのタスクを記録し、アプリ内で管理することができます。

**↓ 実際に作ったアプリはこちら**</br>
[TodoアプリのURL](https://arikait0.github.io/react-todo-app2/)

## アプリの説明と使い方
<img width="872" height="540" alt="image" src="https://github.com/user-attachments/assets/4e516ab6-3af8-4296-8563-27e89a89672f" />
サイトの上側には、自分の未完了タスクの数が表示されます。一目で理解することができます。

下側には、追加したタスクが表示されユーザーはココからタスクを管理できます。このタスクは、毎週ごとに表示されるタスクと、個別で管理できるその他のタスクに分かれています。

タスクには、完了チェックマークと削除ボタンが付いています。この削除ボタンは個別にタスクを削除することができます。

チェックマークをしたタスクは **「完了したタスクを削除」**　のボタンを押すことですべて削除できます。 

<img width="927" height="392" alt="image" src="https://github.com/user-attachments/assets/74b19066-ab1d-4030-b8c9-7b5313a13614" />
ユーザーはココからタスクを追加することができます。

- 名前 : 表示するタスク名を決定できます。2文字以上、32文字以内の制限があります。
- 優先度 : ３段階のタスクの優先度を決めることができます。
- 日付タスクの日付を決めることができます。
- 詳細設定　: ここから **毎週のタスク**　に設定するかどうか決定できます。
- 追加 : タスクの設定が完了したら、ココを押すことで追加できます。



## 使用技術
  - React
  - Typescript
  - HTML
  - Tailwind CSS
    
## 使用したライブラリ
    - react　19.1.1
    - react-dom　19.1.1
    - date-fns　4.1.0
    - dayjs　1.11.18
    - uuid　13.0.0
    - Font Awesome

## 開発履歴

- 2025年10月23日 ～ 2025年11月20日 (約16時間)

## ライセンス

MIT License

Copyright (c) 2025 Kosen Taro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
