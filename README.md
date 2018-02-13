# ryLogin

```mermaid
sequenceDiagram
  A-->B: Works!
```

```mermaid
graph LR
  ST[Start] --> IF1{通信できる?}
  IF1 -->|できる| PC1[処理]
  IF1 -->|できない| ED[End]
  PC1 --> ED
```

```mermaid
gantt
  title ガントチャートテスト
  dateFormat YYYY-MM-DD
  section 製品A開発セクション
  設計       : done,   task1, 2017-12-11,  2017-12-15
  実装       : active, task2, 2017-12-18,  5d
  単体テスト  :         task3, after task2, 5d
  結合テスト  :         task4, after task3, 5d
  ```