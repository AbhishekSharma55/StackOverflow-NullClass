# Fibonacci Program in C

This program demonstrates how to generate a Fibonacci sequence in C.

```c
#include <stdio.h>

int main() {
  int n, i, a = 0, b = 1, next;

  printf("Enter the number of terms: ");
  scanf("%d", &n);

  printf("Fibonacci Series:
");

  for (i = 0; i < n; ++i) {
    printf("%d ", a);
    next = a + b;
    a = b;
    b = next;
  }

  return 0;
}
```