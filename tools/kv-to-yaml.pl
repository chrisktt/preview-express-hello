#!/usr/bin/env perl

=pod
Convert- key-value pairs to YAML.

Usage:
    kv-to-yaml.pl --test
    will run tests

    kv-to-yaml.pl < file.env > file.yaml

For example:
   KEY=VALUE
becomes
   - key: "KEY"
     value: "VALUE"
=cut

if ("--test" eq $ARGV[0]) {test(); exit 0}; # Run tests if --test

while (<>) {
    m/^#|(^\w*$)/ and print and next;   # pass comments and empty lines to output unchanged
    m/=/ or next;  # skip if no equal sign
    chomp;
    ($key,$val) = split('=', $_, 2);
    print "- key: ",   trim($key), "\n";
    print "  value: ", trim($val), "\n";
}


sub  trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s };

# Test code results
sub test {
$given = <<'END-OF-DATA';
# My database parameters for surveys
DB_NAME=surveys-test  # this is the test database
DB_USER=alice
DB_PASS=mypassword #secret
DB_SERVER=surveys.aesbus.com:51234
END-OF-DATA

$expected = <<'END-OF-DATA';
- key: DB_NAME
  value: surveys-test  # this is the test database
- key: DB_USER
  value: alice
- key: DB_PASS
  value: mypassword #secret
- key: DB_SERVER
  value: surveys.aesbus.com:51234
END-OF-DATA


# Send data to this script (currently kv-to-yaml.pl)
open(TEST, "| perl $0") or die "cannot create pipe: $!";
print TEST $given;
close(TEST);
}
