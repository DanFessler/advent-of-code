import json

new_1 =[]
# OPEN FILE/ COPT CONYENTS TO LIST
with open('input.txt') as f:
  copy = f.read()
pps = copy.split('\n\n')

part1_count = 0
count = 0
not_count = 0
for pp in pps:
  if 'byr' in pp and 'iyr' in pp and 'eyr' in pp and 'hgt' in pp and 'hcl' in pp and 'ecl' in pp and 'pid' in pp:
    part1_count += 1
    check = [False, False, False, False, True, False, True]
    checkered = True

    # 4 digits / 1920 <= x <= 2002
    ind_byr = pp.index('byr')
    val_byr = pp[ind_byr + 4 : ind_byr + 8]
    val_byr = int(val_byr)
    if val_byr >= 1920 and val_byr <= 2002:
      check[0] = True

    # 4 digits / 2010 <= x <= 2020
    ind_iyr = pp.index('iyr')
    val_iyr = pp[ind_iyr + 4 : ind_iyr + 8]
    val_iyr = int(val_iyr)
    if val_iyr >= 2010 and val_iyr <= 2020:
      check[1] = True

    # 4 digits / 2020 <= x <= 2030
    ind_eyr = pp.index('eyr')
    val_eyr = pp[ind_eyr + 4 : ind_eyr + 8]
    val_eyr = int(val_eyr)
    if val_eyr >= 2020 and val_eyr <= 2030:
      check[2] = True

    # 150 <= cm <= 190 / 59  76
    ind_hgt = pp.index('hgt')
    try:
      hgt_unit_1 = pp[ind_hgt + 6 : ind_hgt + 8]
    except:
      hgt_unit_1 = None
    try:
      hgt_unit_2 = pp[ind_hgt + 7 : ind_hgt + 9]
    except:
      hgt_unit_2 = None
    val_hgt_1 = pp[ind_hgt + 4 : ind_hgt + 6]
    val_hgt_2 = pp[ind_hgt + 4 : ind_hgt + 7]
    try:
      val_hgt_1 = int(val_hgt_1)
    except:
      val_hgt_1 = None
    try:
      val_hgt_2 = int(val_hgt_2)
    except:
      val_hgt_2 = None
    if hgt_unit_1 == 'in' and val_hgt_1 >= 59 and val_hgt_1 <= 76:
      check[3] = True
    elif hgt_unit_2 == 'cm' and val_hgt_2 >= 150 and val_hgt_2 <= 190:
      check[3] = True

    # 0-9 / a-f
    ind_hcl = pp.index('hcl')
    hash_hcl = pp[ind_hcl + 4]
    val_hcl = pp[ind_hcl + 5 : ind_hcl + 11]
    checker = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    for i in range(6):
      try:
        x = val_hcl[i]
      except:
        x = None
      if x not in checker or hash_hcl != '#':
        check[4] = False
        break

    # one of list
    ind_ecl = pp.index('ecl')
    val_ecl = pp[ind_ecl + 4 : ind_ecl + 7]
    ecl_cols = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    if val_ecl in ecl_cols:
      check[5] = True

    #  9 digits
    ind_pid = pp.index('pid')
    val_pid = '1' + pp[ind_pid + 4 : ind_pid + 13]
    try:
      val_last = pp[ind_pid + 13]
    except:
      val_last = None
    try:
      val_pid_ = int(val_pid)
    except:
      val_pid_ = None
    checker = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    for i in range(10):
      try:
        x = val_pid[i]
      except:
        x = None
      if x not in checker or val_last in checker:
        check[6] = False

    for i in range(7):
      if(check[i] == False):
        checkered = False

    if checkered == True:
      count = count + 1
    else:
      not_count = not_count + 1

    print("byr", check[0])
    print("iyr", check[1])
    print("eyr", check[2])
    print("hgt", check[3])
    print("hcl", check[4])
    print("ecl", check[5])
    print("pid:", check[6])
    print("valid:", checkered)
    pp.replace('\'', ' ')
    pp.replace('\n', ' ')
    print(pp)
    print("------------------------------------------------------------------")

print(part1_count)
print(count)
# print(not_count)
