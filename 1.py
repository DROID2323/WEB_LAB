def res(numbers):
    newint = ''
    i = 0

    for i in range(len(numbers)):
        if numbers[i] % 2 == 0:
         newint += str(numbers[i])
    return newint

numbers = range(1, 11)
print(res(numbers))