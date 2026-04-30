def rem(url):
    result = ""
    i = 0
    
    while i < len(url):
        if url[i] == "#":
            break 
        result += url[i]
        i += 1
    return result


# приклади
print(rem("www.codewars.com#about"))     # www.codewars.com
print(rem("www.codewars.com?page=1"))    # www.codewars.com?page=1