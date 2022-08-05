---
title: "Advent of Code"
description: "Advent of Code Day 1"
# The name of the file is used to generate the pretty link
---

![coffeetype banner](/static/work/preview/coffeetype-preview.png)

```python
import time

def getMeasurementWindowSums(measurements: "list[int]"):
  sums = []

  for i in range(len(measurements) - 2):
    sums.append(measurements[i] + measurements[i + 1] + measurements[i + 2])

  return sums

def countMeasurements(measurements: "list[int]"):
  count = 0

  for i in range(1, len(measurements)):
    if (measurements[i] > measurements[i - 1]):
      count += 1

  return count

if __name__ == "__main__":
  startTime = time.time()

  with open('inputFiles/day1.txt', 'r') as inputFile:
    inputFromFile = inputFile.read()

  # Get input list
  inputList = [int(x) for x in inputFromFile.split('\n') if x]

  count = countMeasurements(inputList)
  print(f'Number increased: {count}')

  sums = getMeasurementWindowSums(inputList)
  countSums = countMeasurements(sums)
  print(f'Sums increased: {countSums}')
  
  print("--- %s seconds ---" % (time.time() - startTime))
```

```java
import javax.swing.*;

import assets.Assets;
import renderers.*;

public class App {
  // JAR sources:
  // https://code.google.com/archive/p/json-simple/ (from https://www.geeksforgeeks.org/parse-json-java/)

	public static void main(String[] args){
		JFrame frame = new JFrame("coffeetype");
    frame.setIconImage(Assets.LOGO.getImage());
    
    MainWindow window = new MainWindow();
    frame.add(window.getPanel());
		
    frame.pack();

		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setResizable(false);
		frame.setVisible(true);
	}
}

```


```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```
