package Koha::IssuingRules;

# Copyright Vaara-kirjastot 2015
# Copyright Koha Development Team 2016
#
# This file is part of Koha.
#
# Koha is free software; you can redistribute it and/or modify it under the
# terms of the GNU General Public License as published by the Free Software
# Foundation; either version 3 of the License, or (at your option) any later
# version.
#
# Koha is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along
# with Koha; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

use Modern::Perl;

use Koha::Database;

use Koha::IssuingRule;

use base qw(Koha::Objects);

=head1 NAME

Koha::IssuingRules - Koha IssuingRule Object set class

=head1 API

=head2 Class Methods

=cut

sub get_effective_issuing_rule {
    my ( $self, $params ) = @_;

    my $default      = '*';
    my $categorycode = $params->{categorycode};
    my $itemtype     = $params->{itemtype};
    my $branchcode   = $params->{branchcode};

    my $search_categorycode = $default;
    my $search_itemtype     = $default;
    my $search_branchcode   = $default;

    if ($categorycode) {
        $search_categorycode = { 'in' => [ $categorycode, $default ] };
    }
    if ($itemtype) {
        $search_itemtype = { 'in' => [ $itemtype, $default ] };
    }
    if ($branchcode) {
        $search_branchcode = { 'in' => [ $branchcode, $default ] };
    }

    my $rule = $self->search({
        categorycode => $search_categorycode,
        itemtype     => $search_itemtype,
        branchcode   => $search_branchcode,
    }, {
        order_by => {
            -desc => ['branchcode', 'categorycode', 'itemtype']
        },
        rows => 1,
    })->single;
    return $rule;
}

=head3 type

=cut

sub _type {
    return 'Issuingrule';
}

sub object_class {
    return 'Koha::IssuingRule';
}

1;
